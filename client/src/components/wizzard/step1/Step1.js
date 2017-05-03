import React, { Component } from 'react';

import SelectGroup from './SelectGroup.js';
import SelectEvent from './SelectEvent.js';

import meetupLogo from '../../../../dist/assets/img/meetup-logo.png';

const Step1 = () => (
    <div className="row">
        <div className="col-lg-8 col-lg-offset-2">
            <div className="panel panel-default">
                <div className="panel-heading text-center"> 
                    <strong>SELECT EVENT</strong> <img src={ meetupLogo } alt="" className="image-heading" />
                </div>
                <div className="panel-body">
                    <form className="form-horizontal" role="form">
                        <SelectGroup />
                        <SelectEvent />
                    </form>
                </div>
            </div>
        </div>
    </div>     
);

export default Step1;