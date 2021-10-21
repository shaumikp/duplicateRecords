public with sharing class ContactTriggerHandler {
    public static void checkDuplicate(List<Contact> currentContacts) {
        List<Contact> contactList = [SELECT Id, Email, FirstName, LastName From Contact where
                                    Email != null AND FirstName != null];

        Map<string, Contact> emailMap = new Map<string, Contact>();
        Map<string, Contact> firstNameMap = new Map<string, Contact>();
        Map<string, Contact> lastNameMap = new Map<string, Contact>();
        
        for(Contact currentContact : currentContacts){
            emailMap.put(currentContact.Email,currentContact);
            firstNameMap.put(currentContact.FirstName,currentContact);
            lastNameMap.put(currentContact.LastName,currentContact);
        }
        
        for (Contact contact : contactList){
            if(emailMap.containsKey(contact.Email) || firstNameMap.containsKey(contact.FirstName) || lastNameMap.containsKey(contact.LastName)){
                throw new CustomException('this is an error message');
            }
        }
    }

    class CustomException extends Exception {

    }

}
