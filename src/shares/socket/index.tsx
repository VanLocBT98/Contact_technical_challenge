import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

import * as signalR from '@microsoft/signalr';

const configImportENV = {
  socketUrl: 'YOUR_SIGNALR_URL_HERE'
};
const URL_SOCKET = configImportENV.socketUrl;

type TSignalRContext = {
  connection: signalR.HubConnection | null;
};

export const SignalRContext = createContext<TSignalRContext | undefined>(undefined);

type SocketProviderProps = {
  children: ReactNode;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(null);

  const initSignalR = useCallback(async () => {
    if (!URL_SOCKET) {
      console.error('SignalR URL is not defined');
      return null;
    }

    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(URL_SOCKET, {
        transport: signalR.HttpTransportType.WebSockets,
        logMessageContent: true,
        logger: signalR.LogLevel.Information
      })
      .configureLogging(signalR.LogLevel.Trace)
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();

    newConnection.serverTimeoutInMilliseconds = 600000;

    newConnection.onreconnecting((error) => {
      console.warn('Reconnecting...', error);
    });

    newConnection.onreconnected((connectionId) => {
      console.log('Reconnected with ID:', connectionId);
    });

    newConnection.onclose((error) => {
      console.error('Connection closed', error);
    });

    try {
      await newConnection.start();
      console.log('SignalR Connected');
      return newConnection;
    } catch (err) {
      console.error('SignalR Connection Error', err);
      return null;
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const setupConnection = async () => {
      if (!connection || connection.state === signalR.HubConnectionState.Disconnected) {
        const newConnection = await initSignalR();
        if (isMounted) {
          setConnection(newConnection);
        }
      }
    };

    setupConnection();

    return () => {
      isMounted = false;
      if (connection) {
        connection
          .stop()
          .then(() => console.log('SignalR Disconnected'))
          .catch((err) => console.error('SignalR Disconnection Error', err));
      }
    };
  }, [connection, initSignalR]);

  const contextValue = useMemo(() => ({ connection }), [connection]);

  return <SignalRContext.Provider value={contextValue}>{children}</SignalRContext.Provider>;
};

export const useSignalR = (): TSignalRContext => {
  const context = useContext(SignalRContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
