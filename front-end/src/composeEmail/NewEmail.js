// Email Class
export class Email {
  constructor(id, fromAddress, toAddress, singleAddressDraft, subject, body, attachments, priority, isDraft) {
    this.id = id;
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.singleAddressDraft = singleAddressDraft; // New property
    this.subject = subject;
    this.body = body;
    this.attachments = attachments;
    this.priority = priority;
    this.isDraft = isDraft;
  }
}

// EmailBuilder Class
export class EmailBuilder {
  constructor() {
    this.id = null; // Optional for completeness
    this.fromAddress = '';
    this.toAddress = [];
    this.singleAddressDraft = ''; // New property
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

  setSingleAddressDraft(singleAddressDraft) { // New setter
    this.singleAddressDraft = singleAddressDraft;
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
      this.singleAddressDraft, // Include the new property
      this.subject,
      this.body,
      this.attachments,
      this.priority,
      this.isDraft
    );
  }
}
