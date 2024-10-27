import { UploadFile } from "@mui/icons-material";
import { FormControl, FormHelperText, Typography } from "@mui/material";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { FieldValues, useController, UseControllerProps } from "react-hook-form"

type Props<T extends FieldValues> = {} & UseControllerProps<T>;

export default function AppDropzone<T extends FieldValues>(props: Props<T>) {
    const { fieldState, field } = useController({ ...props })

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            // Maintain the file object but add preview for UI display
            const fileWithPreview = Object.assign(acceptedFiles[0], {
                preview: URL.createObjectURL(acceptedFiles[0]),
            });

            console.log("FileWithPreview before field change:", fileWithPreview); // For debugging

            // Pass the full `FileWithPreview` object to React Hook Form
            field.onChange(fileWithPreview);
            console.log(field.value);
        }
    }, [field]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const dzStyles = {
        display: 'flex',
        border: 'dashed 3px #eee',
        borderColor: '#eee',
        borderRadius: '5px',
        paddingTop: '30px',
        alignItems: 'center',
        height: 200,
        width: 500
    }

    const dzActive = {
        borderColor: 'green'
    }
    
    return (
        <div {...getRootProps()}>
            <FormControl style={isDragActive ? { ...dzStyles, ...dzActive } : dzStyles} error={!!fieldState.error} >
                <input {...getInputProps()} />
                <UploadFile sx={{ fontSize: '100px' }} />
                <Typography variant='h4'>Drop image here</Typography>
                <FormHelperText>{fieldState.error?.message}</FormHelperText>
            </FormControl>
        </div>
    )
}