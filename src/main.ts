import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { router } from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/lara";
import { definePreset } from "@primeuix/themes";
import ToastService from "primevue/toastservice";

import AutoComplete from "primevue/autocomplete";
import Button from "primevue/button";
import BlockUI from "primevue/blockui";
import Card from "primevue/card";
import Checkbox from "primevue/checkbox";
import Dialog from "primevue/dialog";
import Divider from "primevue/divider";
import FileUpload from "primevue/fileupload";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import Listbox from "primevue/listbox";
import Menubar from "primevue/menubar";
import MultiSelect from "primevue/multiselect";
import Password from "primevue/password";
import ProgressSpinner from "primevue/progressspinner";
import Panel from "primevue/panel";
import Select from "primevue/select";
import Toast from "primevue/toast";
import Textarea from "primevue/textarea";
import InputNumber from "primevue/inputnumber";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{cyan.50}",
      100: "{cyan.100}",
      200: "{cyan.200}",
      300: "{cyan.300}",
      400: "{cyan.400}",
      500: "{cyan.500}",
      600: "{cyan.600}",
      700: "{cyan.700}",
      800: "{cyan.800}",
      900: "{cyan.900}",
      950: "{cyan.950}",
    },
  },
});

app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});
app.use(ToastService);

app.component("AutoComplete", AutoComplete);
app.component("BlockUI", BlockUI);
app.component("Button", Button);
app.component("Card", Card);
app.component("Checkbox", Checkbox);
app.component("Dialog", Dialog);
app.component("InputMask", InputMask);
app.component("InputNumber", InputNumber);
app.component("InputText", InputText);
app.component("Select", Select);
app.component("Menubar", Menubar);
app.component("MultiSelect", MultiSelect);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Panel", Panel);
app.component("Divider", Divider);
app.component("Toast", Toast);
app.component("Textarea", Textarea);
app.component("Password", Password);
app.component("FileUpload", FileUpload);
app.component("Listbox", Listbox);

app.mount("#app");
