/**
* @author Virendra Khatke
* @date 23/10/2020
* @description File Preview Component
*/
public inherited sharing class FilePreviewController {

    @AuraEnabled(cacheable=true)
    public static list<ContentVersion> retriveFilefromChild(Id recordId){

        //get Child opportunity record by parent Account Id
        Id oppId = [SELECT Id, Name from opportunity where AccountId =: recordId WITH SECURITY_ENFORCED LIMIT 1].Id;
        //ContentDocumentLink contentDocumentLinks = new ContentDocumentLink();
        Id contentDocId = [SELECT Id, ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: oppId WITH SECURITY_ENFORCED LIMIT 1].ContentDocumentId;
        return [SELECT Id, Title, FileExtension, ContentDocumentId From ContentVersion WHERE ContentDocumentId =: contentDocId WITH SECURITY_ENFORCED LIMIT 1];
    }
}