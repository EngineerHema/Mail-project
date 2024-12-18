export class Email {
  constructor(id, fromAddress, toAddress, subject, body, attachments, priority, isDraft) {
    this.id = id;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
    this.priority = priority;
    this.isDraft = isDraft; 
  }
}

export class EmailBuilder {
  constructor() {
    this.fromAddress = '';
    this.toAddress = [];
    this.subject = '';
    this.body = '';
    this.attachments = [];
    this.priority = 'medium';
    this.isDraft = false;  
  }

  setFromAddress(fromAddress) {
    this.fromAddress = fromAddress;
    return this;
  }

  addToAddress(address) {
    if (address && !this.toAddress.includes(address)) {
      this.toAddress.push(address);
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

  setIsDraft(isDraft) {
    this.isDraft = isDraft;
    return this;
  }

  build() {
    return new Email(
      this.id,
      this.fromAddress,
      this.toAddress,
      this.subject,
      this.body,
      this.attachments,
      this.priority,
      this.isDraft  
    );
  }
}
