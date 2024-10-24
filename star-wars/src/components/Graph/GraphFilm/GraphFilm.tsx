import { Box, Typography } from '@mui/material';

import { IMAGE_URL } from '../../../common/urls';
import { ContentContainer } from '../../../common/styles';



/**
 * Displays film content with a label and additional info.
 * @param label - The title of the film.
 * @param releaseDate - The release date of the film.
 * @param director - The director of the film.
 * @returns JSX represents the film content.
 */
export const GraphFilm = ({ label, heroFilm, releaseDate, director }: { label: string, heroFilm: number,
    releaseDate: string, director: string }) => (
    <ContentContainer>
        <Typography variant="h5">{label}</Typography>
        <Box component="img"
             sx={{
                 width: '100%', height: 'auto',
                 borderRadius: 1, boxShadow: 3,
             }}
             src={`${IMAGE_URL}/films/${heroFilm}.jpg`}
             onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', margin: 1 }}>
            <Typography variant="body2">Release Date:</Typography>
            <Typography variant="body1">{releaseDate}</Typography>
            <Typography variant="body2">Director:</Typography>
            <Typography variant="body1">{director}</Typography>
        </Box>
    </ContentContainer>
);