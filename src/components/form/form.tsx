import { Avatar, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import TextField from '@mui/material/TextField';
import DogAvatar from '../../assets/images/avatar-dog.jpg';
import CatAvatar from '../../assets/images/avatar-cat.jpg';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { FormControl } from '@mui/material';

const Form = () => {
    const [ petType, setPetType ] = useState('0');
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPetType((event.target as HTMLInputElement).value);
    };

    const radioButtonStyle = {
        color: '#F5ECFF',
        '&.Mui-checked': {
          color: '#2F00B6',
        },
      }

    return (
        <FormControl className='p-4 flex flex-col'>
            <div className='relative'>
                
                <Avatar className='w-[200px] h-[200px] mx-[auto] rounded-[20px]' src={petType === '0' ? DogAvatar : CatAvatar} alt='Фото питомца'/>
                <IconButton className='p-[8px] absolute bottom-[10px] right-[calc(50%-18px)] bg-[#F5ECFF]'>
                    <AddIcon style={{width: 20, height: 20, color: 'black'}}/>
                </IconButton>
            </div>
            <div className='flex flex-col mx-auto'>
                <RadioGroup
                    row
                    defaultValue="0"
                    name="radio-buttons-group"
                    onChange={handleChange}
                >
                    <FormControlLabel value="0" control={<Radio sx={radioButtonStyle} />} label="Собака" />
                    <FormControlLabel value="1" control={<Radio sx={radioButtonStyle} />} label="Кошка" />
                </RadioGroup>
                <TextField label="Label" variant="outlined" size="medium"/>
            </div>

        </FormControl>
    )
}

export default Form;