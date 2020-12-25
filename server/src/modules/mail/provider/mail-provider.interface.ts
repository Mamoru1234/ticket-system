export interface EmailSendOptions {
  targetEmail: string;
  html: string;
  subject: string;
}

export interface MailProvider {
  sendMail(options: EmailSendOptions): Promise<void>;
}

export const MAIL_PROVIDER_TOKEN = 'MAIL_PROVIDER_TOKEN';
