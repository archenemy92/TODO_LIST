import React from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import {AddItemForm} from "../AddItemForm/AddItemForm"

export type HeaderPropsType = {
    addItem: (title: string) => void
}

export const Header: React.FC<HeaderPropsType> = ({addItem}) => {
    return (
        <Box sx={{flexGrow: 1}} >
            <AppBar position="static" style={{backgroundColor:"hsl(237, 86%, 89%)"}}>
                <Toolbar>
                    <AddItemForm addItem={addItem} placeholder={"add new todo"}/>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: "none", sm: "block"}, textAlign:"center"}}
                    >
                        TODO-LIST
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    )
}