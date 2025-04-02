import { styled, TextField } from "@mui/material";
import { ChangeEventHandler, FC, ReactNode } from "react";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";
import { Tooltip, IconButton } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

type CustomInputProps = {
    id: string;
    name?: string;
    label: string;
    handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    value: string | Date;
    multiline?: boolean;
    minRows?: number;
    maxRows?: number;
    select?: boolean;
    flex?: number;
    children?: ReactNode;
    type?: string;
    tooltipText?: string;
    required?: boolean;
    "data-testid"?: string;
    disabled?: boolean;
};

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "#2F00B6",
        borderWidth: 2
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
        color: "#2F00B6"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
        color: "#2F00B6"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "#2F00B6",
        borderWidth: 2
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
        color: "#2F00B6"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
        color: "#2F00B6"
    },
    [`& .${outlinedInputClasses.root}`]: {
        borderRadius: 8
    },
    [`& .${outlinedInputClasses.notchedOutline}`]: {
        borderWidth: 2
    }
});

const CustomInput: FC<CustomInputProps> = ({
    id,
    name,
    label,
    handleChange,
    value,
    multiline,
    minRows,
    maxRows,
    select,
    flex = 1,
    children,
    type = 'text',
    tooltipText,
    required,
    "data-testid": testId,
    disabled = false
}) => {
    const labelContent = tooltipText ? (
        <span id={`${id}-label`} style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {label}
            <Tooltip title={tooltipText}>
                <IconButton
                    size="small"
                    sx={{ padding: 0, marginLeft: "4px" }}
                    tabIndex={-1}
                    aria-label={`Подсказка для ${label}`}
                >
                    <InfoOutlinedIcon fontSize="small" />
                </IconButton>
            </Tooltip>
        </span>
    ) : (
        <span id={`${id}-label`}>{label}</span>
    );

    const displayValue = type === "date" && value instanceof Date
        ? value.toISOString().split("T")[0]
        : value;

    return (
        <StyledTextField
            id={id}
            name={name}
            onChange={handleChange}
            variant="outlined"
            label={labelContent}
            value={displayValue}
            multiline={multiline}
            minRows={minRows}
            maxRows={maxRows}
            className={`flex-${flex} rounded-[8px] text-start`}
            select={select}
            size="small"
            type={type}
            required={required}
            data-testid={testId || `${name}-input`}
            slotProps={{
                inputLabel: {
                    htmlFor: id
                },
                input: {
                    'aria-labelledby': `${id}-label`,
                    'aria-label': label,
                    id: id
                }
            }}
            disabled={disabled}
        >
            {children}
        </StyledTextField>
    );
};

export default CustomInput;