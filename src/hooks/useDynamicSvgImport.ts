import React, { useEffect, useRef, useState } from 'react';

import SvgTest from '~/assets/icons/test';

export function useDynamicSvgImport(iconName: string) {
  const importedIconRef = useRef<React.FC<React.SVGProps<SVGElement>>>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    setLoading(true);
    const importSvgIcon = async (): Promise<void> => {
      try {
        importedIconRef.current = (await import(`~/assets/icons/${iconName}.svg`)).ReactComponent;
        if (!importedIconRef.current) {
          importedIconRef.current = SvgTest as React.FC<React.SVGProps<SVGElement>>;
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    importSvgIcon();
  }, [iconName]);

  return { error, loading, SvgIcon: importedIconRef.current };
}
