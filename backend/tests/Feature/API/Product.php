<?php

namespace Tests\Feature\API;

use Tests\TestCase;

class Product extends TestCase
{
    /**
     * Tests an invalid URL
     *
     * @return void
     */
    public function testMalformedUrl()
    {
    	$response = $this->json('POST', '/api/products', [ 'url' => 'Hello World' ]);
        $response
        	->assertStatus(422)
        	->assertJson([
                'url' => true,
            ]);
    }

    /**
     * Tests a valid URL that isn't whitelisted
     *
     * @return void
     */
    public function testNonWhitelistedUrl()
    {
    	$response = $this->json('POST', '/api/products', [ 'url' => 'http://google.ie/products.xml' ]);
        $response
        	->assertStatus(422)
        	->assertJson([
                'url' => true,
            ]);
    }

    /**
     * Tests the endpoint with no URL value
     *
     * @return void
     */
    public function testNoUrl()
    {
    	$response = $this->json('POST', '/api/products');
        $response
        	->assertStatus(422)
        	->assertJson([
                'url' => true,
            ]);
    }

    /**
     * Tests a valid product URL
     *
     * @return void
     */
    public function testValidWhitelistUrl()
    {
    	$response = $this->json('POST', '/api/products', [ 'url' => 'http://pf.tradetracker.net/?aid=1&type=xml&encoding=utf8&fid=251713&categoryType=2&additionalType=2&limit=10' ]);
        $response
        	->assertStatus(200)
        	->assertJson([]);
    }


    /**
     * Tests the response of a whitelisted URL that doesn't return valid XML
     *
     * @return void
     */
    public function testValidWhitelistUrlNoXML()
    {
    	$response = $this->json('POST', '/api/products', [ 'url' => 'http://pf.tradetracker.net/' ]);
        $response
        	->assertStatus(422)
        	->assertJson([
                'url' => true,
            ]);
    }

    /**
     * Attempts to trick URL validation by adding a domain suffix
     *
     * @return void
     */
    public function testWhitelistUrWithSuffix()
    {
    	$response = $this->json('POST', '/api/products', [ 'url' => 'http://pf.tradetracker.net.com/?aid=1&type=xml&encoding=utf8&fid=251713&categoryType=2&additionalType=2&limit=10' ]);
        $response
        	->assertStatus(422)
        	->assertJson([
                'url' => true,
            ]);
    }
}
