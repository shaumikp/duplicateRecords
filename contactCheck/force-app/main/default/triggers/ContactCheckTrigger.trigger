trigger ContactCheckTrigger on Contact (before insert, before update) {

    if(Trigger.isInsert){
        ContactTriggerHandler.checkDuplicate(Trigger.new);
    }
    // if(Trigger.isUpdate){
    //     ContactTriggerHandler.checkDuplicate(Trigger.old);
    // }
}