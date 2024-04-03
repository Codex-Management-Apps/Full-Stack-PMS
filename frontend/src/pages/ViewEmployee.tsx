import { NormalLayout } from '@/layouts/NormalLayout'

import { useParams } from 'react-router-dom'

import { PositionSection } from '@/components/sections/PositionSection'
import { SignatorySection } from '@/components/sections/SignatorySection'
import { AboutSection } from '@/components/sections/AboutSection'
import { DesignationSection } from '@/components/sections/DesignationSection'
import { useEffect, useState } from 'react'
import { getData } from '@/lib/utils'
import { returnData, AssignDesignation, Employee, AssignPosition  } from '@/lib/types'
import { AddAssignDesignationDialog } from '@/components/dialog/AddAssignDesignationDialog'
import { AddSignatoryDialog } from '@/components/dialog/AddSignatoryDialog'



export default function ViewEmployee(){

    const { id } = useParams<{ id: string }>();
    const [isLoading, setIsLoading] = useState(true);

    const defaultResponse: AssignDesignation | Employee | AssignPosition = {
        id: "",
        address_line: "",
        barangay: "",
        country: "",
        firstname: "",
        lastname: "",
        middlename: "",
        province: "",
        last_update: "",
    };

    const [data, setData] = useState<returnData<AssignDesignation | Employee | AssignPosition>>({
        response: defaultResponse,
        hasRoles: false,
        hasDesignation: false
    });
    

    useEffect(() => {

        const fetchData = async () => {
            try {
                if(id !== ''){
                    const fetchedData = await getData(id!);
                    setData(fetchedData!);    
                }
                
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoading(false); // Update loading state when fetch completes
            }
        };
        fetchData();
        
    }, []);
    // Handles loading for prevention of infinite look or recured rendered and callbacks
    if (isLoading) {
        return null;
    }

    return(
        <NormalLayout>
            <div className='w-full flex flex-col gap-2'>
                
                {/* ------------------------------------------ Signatory Section -------------------------------------------------------------- */}
                {/* This handles if the present data has Signatory assign */}
                {
                 data.hasRoles ? (
                    <>
                        <PositionSection receiveData={data.response as AssignPosition} />
                        <SignatorySection receiveData={data.response as AssignPosition}/>
                    </>
                    ) : (
                   <div className='p-5 flex justify-center items-center'>
                        <div className=' flex flex-col gap-5 justify-center'>
                            <p>Seems like this employee doesnt have a role yet</p>
                            <AddSignatoryDialog/>
                         </div>
                    </div>
                 )
                }
                {/* ----------------------------------------------------------------------------------------------------------------------- */}
                
                {/* ------------------------------------------ About Section -------------------------------------------------------------- */}
                {/*  This section handles what data is present */}
                {/* This Handles if the data has Roles and Designation, therefore the present data is assign_position data */}
                {data.hasRoles && data.hasDesignation && <AboutSection receiveData= {data.response} cameFrom="1"/>}       
                
                {/* This Handles if the data dont have role but has designation, therefore the present data is assign_designation data */}
                {!data.hasRoles && data.hasDesignation && <AboutSection receiveData= {data.response} cameFrom="2"/>}
                
                {/* This is acts if both condition is false, therefore the present data is employee data */}
                {!data.hasRoles && !data.hasDesignation && (<AboutSection receiveData={data.response} cameFrom="3"/>)}
                
                {/* ----------------------------------------------------------------------------------------------------------------------- */}

                {/* ------------------------------------------ Designation Section -------------------------------------------------------------- */}
                {/*  This section handles what data is present */}
                {/* This Handles if the data has Roles and Designation, therefore the present data is assign_position data */}
                {data.hasRoles && data.hasDesignation && <DesignationSection receiveData= {data.response}  cameFrom="1"/> }

                {/* This Handles if the data dont have role but has designation, therefore the present data is assign_designation data */}
                {!data.hasRoles && data.hasDesignation && <DesignationSection receiveData= {data.response} cameFrom="1"/>} 

                {/* This is acts if both condition is false, therefore the we have the option to Add */}
                {!data.hasRoles && !data.hasDesignation && (
                    <div className='p-5 flex justify-center items-center'>
                        <div className=' flex flex-col gap-5 justify-center'>
                            <p>Seems like this employee doesnt have a Designation yet</p>
                            <AddAssignDesignationDialog />     
                        </div>
                    </div>
                )}
                
            </div>
        </NormalLayout>
    )
}