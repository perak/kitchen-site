#!/bin/sh
meteor-kitchen meteor-kitchen.json out && cd out && meteor deploy pims-d.meteor.com && cd .. && echo Success!


