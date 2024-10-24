import { Box, Typography } from '@mui/material';

import { IMAGE_URL } from '../../../common/urls';
import { ContentContainer } from '../../Hero/styles/heroStyles';


/**
 * Displays hero content with a label and additional info.
 * @param label - The name of the hero.
 * @param info - Additional info about the hero.
 * @returns JSX that represents the hero content.
 */
export const GraphHero = ({ label, currHero, info }: { label: string, currHero: number, info: string }) => (
    <ContentContainer>
        <Typography variant="h4">
            {label}
        </Typography>
        <Box component="img"
             sx={{
                 width: '100%', height: 'auto',
                 borderRadius: 1, boxShadow: 3,
             }}
             src={`${IMAGE_URL}/characters/${currHero}.jpg`}
             onError={(e) => (e.currentTarget.style.display = 'none')}
        />
        {info && <Typography variant="body1">{info}</Typography>}
    </ContentContainer>
);