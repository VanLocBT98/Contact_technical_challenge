export enum PATTERNS {
  PASSWORD = '(?=^.{8,50}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\\s)(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]*$',
  EMAIL = '^[a-zA-Z0-9._-]+(?:(\\+[\\w-]+))?@[a-zA-Z0-9-.]+[.][a-zA-Z]{2,6}$'
}

export enum URL_ENDPOINT {
  SERVER,
  CLIENT,
  STORAGE_IMAGE
}

const endpointMapping = {
  [URL_ENDPOINT.SERVER]: import.meta.env.VITE_SERVER_DOMAIN,
  [URL_ENDPOINT.CLIENT]: import.meta.env.VITE_CLIENT_DOMAIN,
  [URL_ENDPOINT.STORAGE_IMAGE]: import.meta.env.VITE_STORAGE_IMAGE
};

export function getEndPoint(endpoint: URL_ENDPOINT): string {
  return endpointMapping[endpoint];
}

export enum TYPE {
  NORMAL = 'NORMAL',
  STANDARD = 'STANDARD',
  PREMIUM = 'PREMIUM'
}

export enum PLACEHOLDERS {
  NAME = 'Name *',
  EMAIL = 'Email *',
  PHONE = 'Phone *',
  ADDRESS = 'Address',
  COMPANY = 'Company *',
  MESSAGE = 'Your message *'

}