import { ChangeEvent, FC } from 'react';
import { FormControlLabel, Radio, RadioGroup } from '@mui/material';

type RadioLabels = {
    label1: string;
    label2: string;
}

type RadioNames = {
    name1: string;
    name2: string;
}

type CustomRadioGroupProps = {
    value: 0 | 1;
    id: string;
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
    groupName: string;
    radioLabels: RadioLabels;
    radioNames: RadioNames;
}

const CustomRadioGroup: FC<CustomRadioGroupProps> = ({value, id, onChangeHandler, groupName, radioLabels, radioNames}) => {
    return (
        <RadioGroup
            row
            value={value}
            name={groupName}
            id={id}
            onChange={onChangeHandler}
            aria-labelledby={`${id}-label`}
            sx={{ 
                display: 'flex',
                justifyContent: 'space-between',
                width: '100%',
                marginBottom: '8px',
                '& .MuiFormControlLabel-root': {
                    flex: '1',
                    marginLeft: 0,
                    '& .MuiButtonBase-root': {
                        padding: '6px'
                    }
                }
            }}
        >
            <FormControlLabel 
                value="0" 
                control={
                    <Radio 
                        size="small"
                        slotProps={{
                            input: { 
                                'aria-label': `${radioLabels.label1}`,
                                id: `${id}-${radioNames.name1}-input`
                            } 
                        }}
                    />
                } 
                label={`${radioLabels.label1}`}
                id={`${id}-${radioNames.name1}`}
                aria-labelledby={`${id}-${radioNames.name1}-label`}
            />
            <FormControlLabel 
                value="1" 
                control={
                    <Radio 
                        size="small"
                        slotProps={{
                            input: { 
                                'aria-label': `${radioLabels.label2}`,
                                id: `${id}-${radioNames.name2}-input`
                            } 
                        }}
                    />
                } 
                label={`${radioLabels.label2}`}
                id={`${id}-${radioNames.name2}`}
                aria-labelledby={`${id}-${radioNames.name2}-label`}
            />
        </RadioGroup>
    )
}

export default CustomRadioGroup;