import { LightningElement, wire } from 'lwc';
import getBoatTypes from '@salesforce/apex/BoatDataService.getBoatTypes';

export default class BoatSearchForm extends LightningElement {
  searchOptions;
  selectedBoatTypeId = '';
  // Private
  error = undefined;
  
  // Wire a custom Apex method
    @wire(getBoatTypes)
  boatTypes({ error, data }) {
    if (data) {
        this.searchOptions = data.map(type => ({
            label: type.Name,
            value: type.Id
        }));
        this.searchOptions.unshift({ label: 'All Types', value: '' });
    } else if (error) {
        console.log('NO LLEGA NADA');
        this.searchOptions = undefined;
        this.error = error;
    }
}

    
    // Fires event that the search option has changed.
    // passes boatTypeId (value of this.selectedBoatTypeId) in the detail
    handleSearchOptionChange(event) {
      try {
          // Get the selected boat type ID from the event
          const typeId = event.target.value;
          console.log('ESTE ES EL ID', typeId);
  
          // Create a new custom event named 'search' with the selected boat type ID in the detail
          const searchEvent = new CustomEvent('search', {
              detail: { boatTypeId: typeId }
          });
          
          // Dispatch the custom event
          this.dispatchEvent(searchEvent);
          console.log('EVENT', searchEvent)
      } catch (error) {
          console.error('Error in handleSearchOptionChange:', error);
      }
  }
  
  }