import { Button, IconButton, makeStyles, Popper, ClickAwayListener, Divider, Avatar, Typography} from '@material-ui/core';
import React, { useState } from 'react';
import avatarPlaceholder from '../../assets/avatar_placeholder.jpg';
import AvatarSmall from '../../components/Avatar/AvatarSmall';
import AvatarExtraSmall from '../../components/Avatar/AvatarExtraSmall';

import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';

import { useDispatch } from 'react-redux';
import { logOff } from '../../store/slices/authenticationSlice';
import useFollowLink from '../../utils/customHooks/useFollowLink';
import { forceReloadPage } from '../../utils/functions/forceReloadPage';
import { uploadsURL } from '../../utils/apis/config/apiUrls';
import DropDownWrapper from './DropDownParts/DropDownWrapper';

const useStyles = makeStyles((theme) => ({
    
    menuContainer: {
        border: '1px solid lightgrey',
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
        flexDirection: 'column',
        minWidth: '150px',

        boxShadow: theme.shadows[5],
        borderRadius: '5px'
    },

    menuButton: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2
    },

    menuButtonUsername: {
        justifyContent: "flex-start",
        width: '100%',
        whiteSpace: 'initial',
        ...theme.typography.body2,
        fontWeight: 900
    },

    menuButtonAvatar: {
        marginRight: theme.spacing(1)
    },

    menuButtonIcon: {
        width: '18px',
        height: '18px',
        color: 'lightgrey',
        marginRight: theme.spacing(1)
    },

    

}));

const ProfileDropDown = ({ currentUser }) => {

    const followLinkHandler = useFollowLink();
    const classes = useStyles();
    const dispatch = useDispatch();

    //?????????????? ???? ??????????????
    const handleLogOff = () => {
        dispatch(logOff());
        window.location.reload();
    }

    const handleLinkEnter = (pathName) => {
        followLinkHandler(pathName)
    }

    const profilePathnameBase = `/profile/${currentUser.username}`

    return (
        <DropDownWrapper

            childrenButton = {
                <AvatarSmall src={currentUser.avatarFilename && `${uploadsURL}/${currentUser.avatarFilename}`}/>
            }

            childrenPopper = {<>
                <Button 
                    className={classes.menuButtonUsername}
                    onClick={() => handleLinkEnter(profilePathnameBase)}
                >
                    <AvatarExtraSmall 
                        className={classes.menuButtonAvatar}
                        src={currentUser.avatarFilename && `${uploadsURL}/${currentUser.avatarFilename}`}
                    />
                    {currentUser.username}
                </Button>

                <Divider/>
                <Button className={classes.menuButton}
                    onClick={() => handleLinkEnter(profilePathnameBase + '/drafts')}
                >
                    <InsertDriveFileOutlinedIcon className={classes.menuButtonIcon}/>
                    ?????????????????? {currentUser.draftArticlesNum > 0 && ` (${currentUser.draftArticlesNum})`}
                </Button>

                <Divider/>
                <Button className={classes.menuButton}
                    onClick={() => handleLinkEnter(profilePathnameBase + '/favorites')}
                >
                    <BookmarkIcon className={classes.menuButtonIcon}/>
                    ????????????????
                </Button>

                <Divider/>
                <Button className={classes.menuButton}
                    onClick={() => handleLinkEnter('/auth/settings/main')}
                >
                    <SettingsRoundedIcon className={classes.menuButtonIcon}/>
                    ??????????????????
                </Button>

                <Divider/>
                <Button className={classes.menuButton}
                    onClick={handleLogOff}
                >
                    <ExitToAppRoundedIcon className={classes.menuButtonIcon}/>
                    ??????????
                </Button>
            </>}

        />
    )
}

export default ProfileDropDown;