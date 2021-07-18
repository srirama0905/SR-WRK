import night from './night.jpg';

import {
    Typography,
    CssBaseline, 
} from '@material-ui/core';
import * as Constants from "../../utilities/_labelinfo";
const TrainingDetails = () =>
{
    return(
        
    <div>
        <CssBaseline />
        <img src={night} alt="night"  style={{ alignSelf: 'center' }} />
            <Typography  variant="h5"  component="h1" gutterBottom>
                {Constants.NIGHT_AWA}
            </Typography>
            
    </div>
        
    );
}
export default TrainingDetails;