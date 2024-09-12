// Define the Field type
export type Field = {
  id: number;
  name: string;
  address: string;
  services: string[];
  //sports: string[];
  sportPitches: any;
};

//   interface Field {
//     id: number;
//     name: string;
//     //sports: string[];
//     sportPitches: any;
//   }

// Create an array to hold your fields globally
let fields: Field[] = [];

// Function to set fields
export const setFields = (newFields: Field[]) => {
  fields = newFields;
};

export const findFieldByID = (id: number) => {
  return fields.find((field) => field.id === id);
};

// Function to get fields
export const getFields = () => {
  return fields;
};
