import { createApp } from "vue";
import App from "./App.vue";
import "./assets/tailwind.css";
import { router } from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/lara";
import { definePreset } from "@primeuix/themes";

import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import InputMask from "primevue/inputmask";
import MultiSelect from "primevue/multiselect";
import ProgressSpinner from "primevue/progressspinner";
import Panel from "primevue/panel";
import Divider from "primevue/divider";
import Select from "primevue/select";
import Toast from "primevue/toast";
import Textarea from "primevue/textarea";
import FileUpload from "primevue/fileupload";
import Password from "primevue/password";

const app = createApp(App);

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

app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("InputText", InputText);
app.component("Select", Select);
app.component("Select", Select);
app.component("MultiSelect", MultiSelect);
app.component("Button", Button);
app.component("Card", Card);
app.component("ProgressSpinner", ProgressSpinner);
app.component("Panel", Panel);
app.component("Divider", Divider);
app.component("Toast", Toast);
app.component("InputMask", InputMask);
app.component("Textarea", Textarea);
app.component("Password", Password);
app.component("FileUpload", FileUpload);

app.mount("#app");
