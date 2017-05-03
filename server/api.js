var express = require('express');
var moment = require('moment');
var request = require('request');
var _ = require('underscore');
var router = express.Router();

var API_KEY = process.env.API_KEY || 'c82231235c2657504973106276847';
var FIND_GROUP_URL = _.template('https://api.meetup.com/find/groups?photo-host=public&page=20&sign=true&key=<%= key %>&text=<%= text %>')
var FIND_EVENTS_URL = _.template('https://api.meetup.com/<%= urlname %>/events?desc=true&status=upcoming%2Cpast&photo-host=public&page=5&sign=true&key=<%= key %>')
var GET_RSVPS_URL = _.template('https://api.meetup.com/<%= urlname %>/events/<%= eventId %>/rsvps?&sign=true&photo-host=public&response=yes&key=<%= key %>')

router.get('/find-group/:text', function(req, res, next) {
  var text = req.params.text;
  request(FIND_GROUP_URL({key: API_KEY, text: text}), function(error, response, body) {
    if (error) {
      res.status(500).json({error: 'Failed retriving data from meetup API'});
    }

    var groups = _.map(JSON.parse(body), function(group) {
        return {
          'id': group.id,
          'name': group.name,
          'urlname': group.urlname,
          'city': group.city,
          'photo': {
            'highres_link': _.isUndefined(group.group_photo) ? undefined : group.group_photo.highres_link,
            'photo_link': _.isUndefined(group.group_photo) ? undefined : group.group_photo.photo_link,
            'thumb_link': _.isUndefined(group.group_photo) ? undefined : group.group_photo.thumb_link
          }
        }
    });
    groups = _.filter(groups, function(group) {
      return !_.isUndefined(group.id);
    });
    
    res.send(groups);
  });
});

router.get('/group-events/:urlname', function(req, res, next) {
  var urlname = req.params.urlname;
  request(FIND_EVENTS_URL({key: API_KEY, urlname: urlname}), function(error, response, body) {
    if (error) {
      res.status(500).json({error: 'Failed retriving data from meetup API'});
    }

    var events = _.map(JSON.parse(body), function(event) {
        return {
          'id': event.id,
          'name': event.name,
          'date': moment(event.time).format('DD-MM-YYYY HH:mm')
        }
    });
    events = _.filter(events, function(event) {
      return !_.isUndefined(event.id);
    });

    res.send(events);
  });
});

router.get('/event-rsvps/:urlname/:eventId', function(req, res, next) {
  var urlname = req.params.urlname;
  var eventId = req.params.eventId;
  request(GET_RSVPS_URL({key: API_KEY, urlname: urlname, eventId: eventId}), function(error, response, body) {
    if (error) {
      res.status(500).json({error: 'Failed retriving data from meetup API'});
    }

    var rsvps = _.map(JSON.parse(body), function(rsvp) {
        return {
          'id': rsvp.member.id,
          'name': rsvp.member.name,
          'photo': {
            'highres_link': _.isUndefined(rsvp.member.photo) ? undefined : rsvp.member.photo.highres_link,
            'photo_link': _.isUndefined(rsvp.member.photo) ? undefined : rsvp.member.photo.photo_link,
            'thumb_link': _.isUndefined(rsvp.member.photo) ? undefined : rsvp.member.photo.thumb_link
          }
        }
    });
    rsvps = _.filter(rsvps, function(rsvp) {
      return !_.isUndefined(rsvp.id);
    });

    res.send(rsvps);
  });
});

module.exports = router;