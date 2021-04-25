import os


def main():
    with open('backend/api/settings/.env') as file:
        for line in file.readlines():
            if len(line.split('=')) == 2:
                os.system(f'heroku config:set {line}')


if __name__ == '__main__':
    main()
