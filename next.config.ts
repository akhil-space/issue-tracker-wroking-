import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  /*for fething avatar image if not abale to access */
  async headers(){
    
    return [
      {
        source:'/:path*',
        headers:[
          {
            key:'referrer-policy',
            value:'no-referrer'
          }
        ]
      }
    ]
  }
};

export default nextConfig;
