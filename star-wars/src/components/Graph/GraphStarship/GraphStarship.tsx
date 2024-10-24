import styled from '@emotion/styled';
import { Box, Typography } from '@mui/material';

import { IMAGE_URL } from '../../../common/urls';


export const ContentContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
}));


/**
 * Displays starship content with a label and additional info.
 * @param label - The name of the starship.
 * @param model - The model of the starship.
 * @param manufacturer - The manufacturer of the starship.
 * @returns JSX represents the starship content.
 */
export const GraphStarship = ({ label, heroStarship, model, manufacturer }: { label: string, heroStarship: number,
    model: string, manufacturer: string }) => (
    <ContentContainer>
        <Typography variant="h5">{label}</Typography>
        <Box component="img"
             sx={{
                 width: '100%', height: 'auto',
                 borderRadius: 1, boxShadow: 3,
             }}
             src={`${IMAGE_URL}/starships/${heroStarship}.jpg`}
             onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1 }}>
            <Typography variant="body2">Model:</Typography>
            <Typography variant="body1">{model}</Typography>
            <Typography variant="body2">Manufacturer:</Typography>
            <Typography variant="body1">{manufacturer}</Typography>
        </Box>
    </ContentContainer>
);