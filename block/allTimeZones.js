import  {
    listTimeZones 
} from 'timezone-support';

export default listTimeZones().map(timezone => {
    return { value: timezone, label: timezone }
})