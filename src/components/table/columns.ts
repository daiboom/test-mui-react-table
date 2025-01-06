import { MRT_ColumnDef } from "material-react-table";
import { Person } from "./makeData";

export const columns: MRT_ColumnDef<Person>[] =  [
    
      {
        accessorKey: 'firstName',
        header: 'First Name', //uses the default width from defaultColumn prop
      },
      {
        accessorKey: 'lastName',
        header: 'Last Name',
      },
      {
        accessorKey: 'email',
        header: 'Email Address',
        size: 250, //increase the width of this column
      },
      {
        accessorKey: 'city',
        header: 'City',
        size: 200, //decrease the width of this column
        enableResizing: false, //disable resizing for this column
      },
      {
        accessorKey: 'country',
        header: 'Country',
        size: 140, //decrease the width of this column
      },
    ]