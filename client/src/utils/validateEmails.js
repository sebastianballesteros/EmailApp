const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default (recipients) => {
  const invalidEmails = recipients
  .split(",")
  .map(recipient => recipient.trim())
  //filter function will dump the email from the array if it doesnt match re
  .filter( recipient => re.test(recipient) === false );

  if(invalidEmails.length){
    return `These emails are invalid ${invalidEmails}`;
  }
  return;
};
