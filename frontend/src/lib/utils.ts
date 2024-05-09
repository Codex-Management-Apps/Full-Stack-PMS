
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const handleReload = (seconds : number) => {
  return new Promise<void>((resolve) => {
    const intervalId = setInterval(() => {
      seconds -= 1;
      console.log(`Page will reload in ${seconds} seconds`);
      if (seconds === 0) {
        clearInterval(intervalId);
        resolve();
      }
    }, 1000);
  })
  .then(() => {
    console.log('Reloading page...');
    window.location.reload();
  });
};


// Checks data if it exsits
// Then Sends data starting from Position -> Designation -> Emplyee
// export async function getData( id : string): Promise<returnData<any> | undefined>{
//   if(id === '') return undefined
  
//   try {

//     if(await isPositionAssigned(id)){

//       const response = await getPositionByEmployeeId(id);
      
//       return {
//         response: response,
//         hasRoles: true,
//         hasDesignation: true,
//       }
    
//     }
//     else if(await isEmployeeAssigned(id)) {
    
//       const response = await getAssignDesignationByEmployeeId(id);
//       return {
//         response: response,
//         hasRoles: false,
//         hasDesignation: true,
//       }
    
//     } else{
    
//       const response = await getEmployeeById(id);
//       return {
//         response: response,
//         hasRoles: false,
//         hasDesignation: false,
//       }
      
//     }

//   } catch (error) {
//     console.log("Error: " +error)
//   }
// }

// export function isAssignDesignation(data: any): data is AssignDesignation {
//   return 'designation' in data;
// }

// export function isEmployee(data: any): data is Employee {
//   return 'firstname' in data;
// }

// export function isAssignPosition(data: any): data is AssignPosition {
//   return data;
// }