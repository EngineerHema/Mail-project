export class Email {
  constructor(fromAddress, toAddress, subject, body, attachments, priority) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress; // Array of strings
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
    this.priority = priority; // Priority level (e.g., 'high', 'medium', 'low')
  }
}

export class EmailBuilder {
  constructor() {
    this.fromAddress = '';
    this.toAddress = [];
    this.subject = '';
    this.body = '';
    this.attachments = [];
    this.priority = 'medium'; // Default priority
  }

  setFromAddress(fromAddress) {
    this.fromAddress = fromAddress;
    return this;
  }

  addToAddress(address) {
    if (address && !this.toAddress.includes(address)) {
      this.toAddress.push(address); // Add unique address
    }
    return this;
  }

  setSubject(subject) {
    this.subject = subject;
    return this;
  }

  setBody(body) {
    this.body = body;
    return this;
  }

  addAttachment(attachment) {
    this.attachments.push(attachment);
    return this;
  }

  setPriority(priority) {
    this.priority = priority;
    return this;
  }

  build() {
    return new Email(
      this.fromAddress,
      this.toAddress,
      this.subject,
      this.body,
      this.attachments,
      this.priority // Include priority in the built email
    );
  }
}
