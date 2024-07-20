import getBoats from '@salesforce/apex/BoatDataService.getBoats';
import boatMessageChannel from '@salesforce/messageChannel/boatMessageChannel__c';
import { subscribe, unsubscribe, APPLICATION_SCOPE, MessageContext,} from 'lightning/messageService';
import { LightningElement, wire, track } from 'lwc';

const SUCCESS_TITLE = 'Success';
const MESSAGE_SHIP_IT     = 'Ship it!';
const SUCCESS_VARIANT     = 'success';
const ERROR_TITLE   = 'Error';
const ERROR_VARIANT = 'error';
export default class BoatSearchResults extends LightningElement {
  
  columns = [];
  boatTypeId ;
  boats;
  isLoading = false;

  subscription = null;
  boatTypeId;

  @wire(MessageContext)
  messageContext; // wired message context
  
  // Subscription reference for boat message channel
  connectedCallback (){
    this.subscription = subscribe(
      this.messageContext,
      boatMessageChannel,
      (message) => this.handleMessage(message),
      { scope: APPLICATION_SCOPE }
      
  );
  console.log('SUSCRITO AL CANAL DE MENSAJES');
  };
handleMessage(message) {
  this.boatTypeId = message.boatTypeId;
  console.log ('LLEGO EL MENSAJE', message.boatTypeId);
};
disconnectedCallback() {
  if (this.subscription) {
    unsubscribe(this.subscription);
    this.subscription = null;
}
};

@wire(getBoats, { boatTypeId: '$boatTypeId' })
  wiredBoats({ error, data }) {
    if (data) {
      this.boats = data;
      console.log('DATA', data);
    } else if (error) {
      console.log('NO LLEGA NADA');
    }
  }
  
// public function that updates the existing boatTypeId property
// uses notifyLoading
searchBoats(boatTypeId) {
 
 }

  // wired getBoats method 
  wiredBoats(result) { }
  
  
  // this public function must refresh the boats asynchronously
  // uses notifyLoading
  refresh() { }
  
  // this function must update selectedBoatId and call sendMessageService
  updateSelectedTile() { }
  
  // Publishes the selected boat Id on the BoatMC.
  sendMessageService(boatId) { 
    // explicitly pass boatId to the parameter recordId
  }
  
  // The handleSave method must save the changes in the Boat Editor
  // passing the updated fields from draftValues to the 
  // Apex method updateBoatList(Object data).
  // Show a toast message with the title
  // clear lightning-datatable draft values
  handleSave(event) {
    // notify loading
    const updatedFields = event.detail.draftValues;
    // Update the records via Apex
    updateBoatList({data: updatedFields})
    .then(() => {})
    .catch(error => {})
    .finally(() => {});
  }
  // Check the current value of isLoading before dispatching the doneloading or loading custom event
  notifyLoading(isLoading) { }
}
