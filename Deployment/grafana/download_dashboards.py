import urllib.request
import json
import os

urls = {
    "node_exporter_1860.json": "https://grafana.com/api/dashboards/1860/revisions/37/download",
    "nodejs_11156.json": "https://grafana.com/api/dashboards/11156/revisions/2/download"
}

out_dir = "/home/azureuser/Deployment/grafana/dashboards"

for filename, url in urls.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = response.read().decode('utf-8')
            
            # Replace placeholder variables the same way Grafana UI does
            data = data.replace('"${DS_PROMETHEUS}"', '"Prometheus"')
            data = data.replace('DS_PROMETHEUS', 'Prometheus')
            
            # Save the JSON
            file_path = os.path.join(out_dir, filename)
            with open(file_path, 'w') as f:
                f.write(data)
                
            print(f"Downloaded and processed {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
