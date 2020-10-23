import { LightningElement, wire, track, api } from 'lwc';

// importing Apex class method
import retriveFilefromChild from '@salesforce/apex/FilePreviewController.retriveFilefromChild';

// importing navigation service
import { NavigationMixin } from 'lightning/navigation';

// extends the class to 'NavigationMixin'
export default class FilePrivewInLWC extends NavigationMixin(LightningElement) {
    // reactive variables
    @track files;
    @api recordId;

    // Reteriving the files to preview
    @wire(retriveFilefromChild, {recordId:'$recordId'})
    filesData({data, error}) {
        if(data) {
            window.console.log('data ===> '+data);
            this.files = data;
        }
        else if(error) {
            window.console.log('error ===> '+JSON.stringify(error));
        }
    }

    // when you click the preview button this method will call and
    // it will show the preview of the file based on ContentDocumentId
    filePreview(event) {
        // Naviagation Service to the show preview
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'preview'
            },
            state : {
                // assigning ContentDocumentId to show the preview of file
                selectedRecordId:event.currentTarget.dataset.id
            }
          })
    }
}