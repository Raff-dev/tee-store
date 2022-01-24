import os


def main():
    ENV_PATHS = [
        './.env'
        './backend/api/settings/.env',
    ]

    for env_path in ENV_PATHS:
        with open(env_path) as file:
            for line in file.readlines():
                if len(line.split('=')) >= 2:
                    os.system(f'heroku config:set {line}')


if __name__ == '__main__':
    main()
