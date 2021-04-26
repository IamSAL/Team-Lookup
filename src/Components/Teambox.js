import React from 'react'
import teamlogo from '../images/image 22.png';
import './teamb.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router';

const Teambox = ({ teaminfo }) => {
    const history = useHistory()
    const { strAlternate, strTeam, strSport, idTeam, strTeamBadge } = teaminfo;
    return (
        <div className="teambox">
            <img src={strTeamBadge} />
            <h2>{strAlternate?.split(',').slice(-1)[0] || strTeam}</h2>
            <p>Spors type: {strSport}</p>
            <button onClick={(e) => history.push(`./team/${idTeam}`)}>
                Explore
                <FontAwesomeIcon icon={faArrowRight} style={{ marginLeft: "5px" }} />
            </button>
        </div>
    )
}

export default Teambox
