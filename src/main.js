/**
 * Premier's Awards: Admin Application
 * Developer: Spencer Rose (BCGov, PSA)
 * Version: 2.0.0
 * Module: main.js
 *
 * **/

// Vue initialization
import {createApp} from 'vue';
import App from './App.vue';
const app = createApp(App);
import router from './router';
import {createPinia} from "pinia/dist/pinia";

// import Primevue components
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import Toast from 'primevue/toast';
import Menubar from "primevue/menubar";
import DataTable from 'primevue/datatable';
import Card from 'primevue/card';
import Sidebar from 'primevue/sidebar';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';
import Row from 'primevue/row';
import Button from 'primevue/button';
import Dialog from "primevue/dialog";
import ConfirmDialog from "primevue/confirmdialog";
import Fieldset from 'primevue/fieldset';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import ProgressSpinner from 'primevue/progressspinner';
import Message from 'primevue/message';
import InlineMessage from 'primevue/inlinemessage';
import Skeleton from 'primevue/skeleton';
import Avatar from 'primevue/avatar';
import Divider from "primevue/divider";

// import custom components
import Header from '@/components/common/Header.vue';
import Placeholder from '@/components/common/Placeholder.vue';
import PartnersFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/PartnersFieldset.vue';
import NomineesFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/NomineesFieldset.vue';
import OrganizationFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/OrganizationFieldset.vue';
import NomineeFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/NomineeFieldset.vue';
import NominatorsFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/NominatorsFieldset.vue';
import NominationTitleFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/NominationTitleFieldset.vue';
import NominationsFieldset from '@/components/fieldsets/NominationsFieldset.vue';
import EvaluationFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/EvaluationFieldset.vue';
import ContactsFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/ContactsFieldset.vue';
import AttachmentsFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/AttachmentsFieldset.vue';
import AcknowledgeFieldset from '@/../../premiers-awards-admin/src/components/fieldsets/AcknowledgeFieldset.vue';

// register global components
app.component('Menubar', Menubar);
app.component('Toast', Toast);
app.component('Message', Message);
app.component('InlineMessage', InlineMessage);
app.component('DataTable', DataTable);
app.component('Card', Card);
app.component('Sidebar', Sidebar);
app.component('Column', Column);
app.component('ColumnGroup', ColumnGroup);
app.component('Row', Row);
app.component('Button', Button);
app.component('Dialog', Dialog);
app.component('ConfirmDialog', ConfirmDialog);
app.component('ProgressSpinner', ProgressSpinner);
app.component('Skeleton', Skeleton);
app.component('Avatar', Avatar);
app.component('Divider', Divider);

// register form components
app.component('Fieldset', Fieldset);
app.component('InputText', InputText);
app.component('MultiSelect', MultiSelect);
app.component('Dropdown', Dropdown);

// register custom components
app.component('Placeholder', Placeholder);
app.component('Header', Header);
app.component('PartnersFieldset', PartnersFieldset);
app.component('NomineesFieldset', NomineesFieldset);
app.component('OrganizationFieldset', OrganizationFieldset);
app.component('NomineeFieldset', NomineeFieldset);
app.component('NominatorsFieldset', NominatorsFieldset);
app.component('NominationTitleFieldset', NominationTitleFieldset);
app.component('NominationsFieldset', NominationsFieldset);
app.component('EvaluationFieldset', EvaluationFieldset);
app.component('ContactsFieldset', ContactsFieldset);
app.component('AttachmentsFieldset', AttachmentsFieldset);
app.component('AcknowledgeFieldset', AcknowledgeFieldset);

// initialize and mount app
app.use(ConfirmationService);
app.use(ToastService);
app.use(PrimeVue);
app.use(createPinia());
app.use(router);
app.mount('#app');