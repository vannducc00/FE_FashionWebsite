import React, { Component } from 'react'
// import InputLabel from "@material-ui/core/InputLabel";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

export default class Cart extends Component {
    render() {
        return (
            <div className="container" style={{ paddingTop: "13em" }}>
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2">
                        {/* <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple">Color</InputLabel>
                            <Select
                                native
                                value={state.age}
                                onChange={handleChange}
                                label="Color"
                                inputProps={{
                                    name: "Color",
                                    id: "outlined-age-native-simple"
                                }}
                            >
                                <option aria-label="None" value="" />
                                <option value={10}>Ten</option>
                                <option value={20}>Twenty</option>
                                <option value={30}>Thirty</option>
                            </Select>
                        </FormControl> */}
                    </div>
                    <div className="col-md-2"></div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        )
    }
}
