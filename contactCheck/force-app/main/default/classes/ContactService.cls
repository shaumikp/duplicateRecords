public class ContactService {
    @AuraEnabled
    public static Id addContact(Contact contact){
        Id contactId;
        try{
            contactId =  Database.insert(contact,false).getId();
            System.debug(contactId);
            return contactId;
        }
        catch(Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
        
    }
}