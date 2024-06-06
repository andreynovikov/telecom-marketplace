'use server'

import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import { getContractors } from '@/components/contractor/queries'

export default async function ContractorCheck() {
    const data = await getContractors()

    return data?.inn ? <CheckIcon color="success" fontSize="small" sx={{mr: -0.5}} /> : <CloseIcon color="error" fontSize="small" sx={{mr: -0.5}} />
}