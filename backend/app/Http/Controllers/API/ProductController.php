<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Requests\Products\UrlRequest;
use App\Http\Controllers\Controller;

class ProductController extends Controller
{
	/**
     * Attempts to retrieve XML from a URL and convert to JSON.
     *
     * @param $request {UrlRequest}
     */
    public function index(UrlRequest $request){

		try {
			$productXml = simplexml_load_string(file_get_contents($request->input('url')));
			$productsArray = [];

			foreach ($productXml->product as $product) {	

				$newProduct = [
					'productID' => (string) $product->productID,
					'name' => (string) $product->name,
					'description' => (string) $product->description,
					'price' => (string) $product->price,
					'currency' => (string) $product->price->attributes()->currency,
					'categories' => [],
					'productURL' => (string) $product->productURL,
					'imageURL' => (string) $product->imageURL,
				];

				foreach ($product->categories->category as $cat) {
					$newProduct['categories'][] = (string) $cat;
				}

				$productsArray[] = $newProduct;
			}
			
			return response($productsArray, 200);

		} catch (\Exception $e) {
			return response([
				'url' => ['Data may be missing or incorrectly formatted.']
			], 422);
		}
    }
}
