import React, { Component } from 'react';

import { firebase } from '../../../firebase/firebaseConfig';
import FirebaseFileUploader from 'react-firebase-file-uploader';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';

class FileUploader extends Component {
    state = {
        imageName: '',
        isUploading: false,
        isUploadSuccess: false,
        uploadMsg: '',
        fileURL: ''
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.defaultImage) {
            return prevState = {
                imageName: nextProps.defaultImageName,
                fileURL: nextProps.defaultImage
            };
        }
        else {
            return null;
        }
    }

    onUploadStartHandler = () => {
        this.setState({isUploading: true});
    }

    onUploadErrorHandler = () => {
        this.setState({
            isUploading: false,
            isUploadSuccess: false,
            uploadMsg: 'Something went wrong, please try again.'
        });
    }

    onUploadSuccess = (filename) => {
        this.setState({
            imageName: filename,
            isUploading: false,
            isUploadSuccess: true,
            uploadMsg: 'Successfully uploaded.'
        });

        setTimeout(() => {
            this.setState({uploadMsg: ''});
        }, 3000)

        firebase.storage().ref(this.props.dir)
        .child(filename).getDownloadURL()
        .then(url => {
            this.setState({fileURL: url});
            this.props.filename(filename);
        })
        .catch(error => {
            this.setState({uploadMsg: 'Something went wrong, please try again.'});
        });
    }

    removeImageHandler = () => {
        this.setState({
            imageName: '',
            isUploading: false,
            isUploadSuccess: false,
            uploadMsg: '',
            fileURL: ''
        });
        this.props.resetImage();
    }

    render() {
        return (
            <div>
                {!this.state.fileURL ?
                    <div>
                        <div className="label_inputs">{this.props.tag}</div>
                        <FirebaseFileUploader 
                            accept="image/*"
                            name="image"
                            randomizeFilename
                            storageRef={firebase.storage().ref(this.props.dir)}
                            onUploadStart={this.onUploadStartHandler}
                            onUploadError={this.onUploadErrorHandler}
                            onUploadSuccess={this.onUploadSuccess}
                        />
                    </div>
                    :
                    <div className="image_upload_container">
                        <img
                            style={{width: '100%'}}
                            src={this.state.fileURL}
                            alt={'Player'}
                        />
                        <div style={{marginBottom: '20px'}}>
                            <Button 
                                variant="outlined" 
                                color="primary" 
                                onClick={this.removeImageHandler}
                            >
                                Remove Image
                            </Button>
                        </div>
                    </div>
                }
                {this.state.isUploading ?
                    <div style={{margin: '20px 0'}}>
                        <CircularProgress style={{color: '#98c6e9'}} />
                    </div>
                    :
                    null
                }
                {this.state.uploadMsg ?
                    <div className={this.state.isUploadSuccess ? 'success_label' : 'error_label'}>
                        {this.state.uploadMsg}
                    </div>
                    :
                    null
                }
            </div>
        );
    }
}

export default FileUploader;