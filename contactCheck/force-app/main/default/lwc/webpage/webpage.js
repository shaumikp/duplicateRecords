import { LightningElement, track, wire} from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import addContact from '@salesforce/apex/ContactService.addContact';
import FName from '@salesforce/schema/Contact.FirstName';
import LName from '@salesforce/schema/Contact.LastName';
import Email from '@salesforce/schema/Contact.Email';



    export default class Webpage extends LightningElement {

        @track firstname = FName;
        @track lastname = LName;
        @track email = Email;

        contactRecord = {
            FirstName : this.firstname,
            LastName : this.lastname,
            Email : this.email
        }

        handleFirstNameChange(event){
            this.contactRecord.FirstName = event.target.value;
            console.log(this.contactRecord.FirstName);
        }

        handleLastNameChange(event){
            this.contactRecord.LastName = event.target.value;
            console.log(this.contactRecord.LastName);
        }

        handleEmailChange(event){
            this.contactRecord.Email = event.target.value;
            console.log(this.contactRecord.Email);
        }

        handleClick(event){
            // console.log("my name is:" + firstname);
            // this.contactRecord[event.currentTarget.dataset.field] = event.target.value;
            console.log(this.contactRecord.FirstName);

            addContact({ contact: this.contactRecord})
            .then(result => {
                const event = new ShowToastEvent({
                    title: 'Contact created',
                    message: 'New Contact {0} created {1}',
                    messageData: [
                        'Salesforce',
                            {
                                url: 'https://mindful-fox-oepno-dev-ed.lightning.force.com/lightning/r/Contact/'+ result +'/view',
                                label: this.contactRecord.FirstName + this.contactRecord.LastName 
                            }
                    ],
                    variant: 'success',
                });
                console.log(result);
                this.dispatchEvent(event);
                console.log(JSON.stringify(result));
            })
            .catch(error => {
                const event = new ShowToastEvent({
                    title : 'Error',
                    message : 'Error creating contact.',
                    variant : 'error'
                });
                this.dispatchEvent(event);
                console.log(error);
            });
        }
}