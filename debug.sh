#!/bin/sh
meteor-kitchen meteor-kitchen.json out && cd out && meteor deploy --debug pims-d.meteor.com && cd .. && echo Success!


