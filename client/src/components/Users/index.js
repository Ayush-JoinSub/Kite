import React, { useState, useEffect } from 'react'
import { 
    FormControl,
    FormLabel,
    FormControlLabel,
    FormGroup,
    Checkbox, 
    FormHelperText,
    Avatar, 
    ListItemAvatar,
    Card,
    Button,
} from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { getAllUsers } from '../../actions/actions';
import useStyles from './style';
import { useNavigate } from 'react-router-dom';

const Users = () => {
    //localStorage.clear();
    const navigate = useNavigate();
    const items = {...localStorage};
    console.log('localStorage', (items));

    const classes = useStyles();
    const [data, setData] = useState([{}]);
    
    const [checked, setChecked] = useState([]);
    
    const getUsers = async () => {
        getAllUsers().then((response) => {
            console.log('getUsers function', response);
            setData(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    useEffect(() => {
        getUsers();
        
    }, []);

    console.log('state object of data', data);
    let index = -1;
    const handleToggle = (value) => () => {
        console.log(value);
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        index = newChecked.indexOf(value);

        if (index !== -1) {
            localStorage.setItem(newChecked[index].zerodhaID, JSON.stringify(newChecked[index].username));
        } else {
            localStorage.removeItem(value.zerodhaID);
        }
        
        console.log(index);
        setChecked(newChecked);
    };
    
    console.log(checked);

  return (
    <div>
            {data.map((value) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                    <Card>
                        <FormControl component="fieldset" className={classes.formControl}>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox
                                    onChange={handleToggle(value)}
                                    checked={checked.indexOf(value) != -1}
                                    name={`${value.username} (${value.zerodhaID})`} />}
                                    label={`${value.username} (${value.zerodhaID})`}
                                />
                            </FormGroup>
                        </FormControl>
                    </Card>
                );
            })}
          <Button variant="contained" color='secondary' style={{margin: 10}} type="submit" onClick={() => navigate('/stocks')}>
            Place Order
          </Button>
    </div>
  )
}

export default Users;