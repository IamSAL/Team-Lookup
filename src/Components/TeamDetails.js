import React, { useState, useEffect } from 'react'
import Header from './Header'
import teamlogo from '../images/image 22.png';
import teampicMale from '../images/male.png';
import teampicFemale from '../images/female.png';
import './TeamDetails.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faMapPin, faFlag, faRunning, faMars, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons'
import { useHistory, useParams } from 'react-router';
const TeamDetails = () => {
    const [details, setdetails] = useState({})
    const { teamID } = useParams()
    const history = useHistory()
    useEffect(() => {
        fetch(`https://www.thesportsdb.com/api/v1/json/1/lookupteam.php?id=${teamID}`)
            .then(res => res.json()).then(teamsdata => { setdetails(teamsdata.teams[0]); console.log(teamsdata.teams[0]) })
        return () => {

        }
    }, [])


    return (
        <div className="teamdetails">
            <Header type="logo" data={{ logo: details.strTeamBadge }}></Header>
            <div className="details">
                <div className="summary">
                    <div className="points">
                        <h3>{details.strAlternate?.split(',').slice(-1)[0] || details.strTeam}</h3>
                        <ul>
                            <li><FontAwesomeIcon className="icon" icon={faMapPin}></FontAwesomeIcon>
                                Founded:{details.intFormedYear}
                            </li>
                            <li><FontAwesomeIcon className="icon" icon={faFlag}></FontAwesomeIcon>
                                Country: {details.strCountry}
                            </li>
                            <li>
                                <FontAwesomeIcon className="icon" icon={faRunning}></FontAwesomeIcon>
                                Sport type: {details.strSport}
                            </li>
                            <li>
                                <FontAwesomeIcon className="icon" icon={faMars}></FontAwesomeIcon>
                                Gender: {details.strGender}
                            </li>
                        </ul>
                    </div>
                    <div className="image">
                        <img src={details.strTeamFanart1 ? details.strTeamFanart1 : details.strGender == "Male" ? teampicMale : teampicFemale} alt="" srcset="" />
                    </div>
                </div>

                <div className="description">
                    <p>
                        {details.strDescriptionEN}
                    </p>

                </div>
            </div>
            <div className="social-icons">
                <FontAwesomeIcon className="icon" icon={faTwitter}></FontAwesomeIcon>
                <FontAwesomeIcon className="icon" icon={faFacebook}></FontAwesomeIcon>
                <FontAwesomeIcon className="icon" icon={faYoutube}></FontAwesomeIcon>
            </div>
            <div className="control">
                <button onClick={(e) => history.push(`/`)}>
                    Back
                <FontAwesomeIcon icon={faArrowLeft} style={{ marginLeft: "5px" }} />
                </button>
            </div>
        </div>
    )
}

export default TeamDetails
