export interface ResendOptions {
  from?: string; // The email address of the sender
  to: string; // An array of recipient email addresses
  subject?: string; // The subject of the email
  text?: string; // The plain text content of the email
  html?: string; // The HTML content of the email
  cc?: string; // An array of CC recipient email addresses (optional)
  bcc?: string; // An array of BCC recipient email addresses (optional)
  attachments?: {
    // Array of attachment objects (optional)
    filename: string; // Name of the file
    content: string | Buffer; // Content of the file as a base64 encoded string or a Buffer
    path?: string; // Path to the file (optional)
  };
}
