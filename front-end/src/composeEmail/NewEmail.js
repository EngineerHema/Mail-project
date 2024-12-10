// EmailBuilder.js

export class Email {
  constructor(fromAddress, toAddress, subject, body, attachments) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress; // Array of strings
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
  }
}

export class EmailBuilder {
  constructor() {
    this.fromAddress = ''; 
    this.toAddress = []; 
    this.subject = '';
    this.body = '';
    this.attachments = [];
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

  build() {
    return new Email(
      this.fromAddress,
      this.toAddress,
      this.subject,
      this.body,
      this.attachments
    );
  }
}
