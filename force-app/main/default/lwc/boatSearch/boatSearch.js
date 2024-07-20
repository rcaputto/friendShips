import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import {  MessageContext, publish } from 'lightning/messageService';
import boatMessageChannel from '@salesforce/messageChannel/boatMessageChannel__c';

 export default class BoatSearch extends NavigationMixin(LightningElement) {
    isLoading = false;
    @wire(MessageContext)
    messageContext;
    
    // Handles loading event
    handleLoading() {
      this.isLoading = true
     }
    
    // Handles done loading event
    handleDoneLoading() {
      this.isLoading = false
     }
     
    searchBoats(event) { // Handles search boat event // This custom event comes from the form
      const boatTypeId = event.detail;
      //this.selectedBoatTypeId = boatTypeId;
      console.log('Evento en el padre:', boatTypeId);
    
      const payload = { boatTypeId: event.detail };
      publish(this.messageContext, boatMessageChannel, payload);
      console.log('PAYLOAD', payload)
      console.log('Mensaje publicado');
    }

    //Publishing the event on the message channel to boatSearchResults
    
    
    
    createNewBoat() { 
      this[NavigationMixin.Navigate]({
        type: 'standard__objectPage',
        attributes : {
          objectApiName: 'Boat__c',
          actionName: 'new'
        }
      })
    }
  }