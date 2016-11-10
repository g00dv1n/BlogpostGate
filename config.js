/**
 * Created by g00dv1n on 21.09.16.
 */
'use strict'

let config = {
    PORT: process.env.PORT || 9998,
    mongoUrl: 'mongodb://localhost/blogpostgate',
    blogURLS: [
        'https://threatinfo.net/poster/post.php',
        'https://adwaretips.net/botoposter/',
        //'http://deleteadware.net/botoposter/',
        'http://anti-malware.gridinsoft.com/botoposter/',
        'http://adwareremoval.info/botoposter/index.php',
        'http://pc-threat-info.com/botoposter/index.php',
        'http://pc-threat-info.net/botoposter/index.php'
    ]
}

module.exports = config;