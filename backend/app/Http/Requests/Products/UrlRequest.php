<?php

namespace App\Http\Requests\Products;

use Illuminate\Foundation\Http\FormRequest;

class UrlRequest extends FormRequest
{

    /**
     * The list of domains the application should accept.
     *
     * @var array
     */
    private $whitelist = [
        'pf.tradetracker.net'
    ];

    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'url' => [
                'required',
                'url',
                'regex:'. $this->regexWhitelist()
            ]
        ];
    }

    /**
     * Overwrites the default validation error messages.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'url.regex' => 'That domain is not permitted.'
        ];
    }

    /**
     * Build a regex pattern to validate the URL provided against the whitelist.
     *
     * @return string
     */
    private function regexWhitelist(){
        if(sizeof($this->whitelist) === 0){
            return '/[\s\S]*/';
        } else {
            $whitelistRegex = '/';

            for ($i = 0; $i < sizeof($this->whitelist); $i++) {
                $whitelistRegex .= (($whitelistRegex !== '/') ? '|' : '') . '^(http|https):\/\/' . $this->whitelist[$i] . '(\/|$)';
            }

            return $whitelistRegex . '/';
        }
    }
}
